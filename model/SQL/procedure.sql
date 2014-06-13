USE igroup;
go;

DELIMITER //
CREATE PROCEDURE p_team_join(IN in_teamid INTEGER ,IN in_loginid INTEGER )
BEGIN

  SELECT COUNT(*), members, owner INTO @tcount, @mem,@owner FROM team WHERE id= in_teamid AND status=1;
  IF @tcount =0 THEN
    SELECT 'NO_TEAM' AS result;
  ELSE
    IF @owner=in_loginid THEN
      SELECT 'OWNER_JOINING' AS result;
    ELSEIF @mem>=3 THEN
      SELECT 'MEMBER_COUNT_LIMITED' AS result;
    ELSE

      SELECT COUNT(*) INTO @utcount FROM userteam WHERE teamid= in_teamid AND loginid=in_loginid;
      IF @utcount>=1  THEN
        SELECT 'USER_ALREAY_IN_TEAM' AS result;
      ELSE
        INSERT INTO userteam(teamid,loginid,time,status) VALUES (in_teamid,in_loginid,UNIX_TIMESTAMP(),1);
        UPDATE team SET members=(SELECT COUNT(*) FROM userteam WHERE teamid=in_teamid) WHERE id=in_teamid;
      END IF;
    END IF;
  END IF;
END
//
DELIMITER ;



DELIMITER //
CREATE PROCEDURE p_team_leave(IN in_teamid INTEGER ,IN in_loginid INTEGER )
BEGIN
  UPDATE userteam SET status=0 WHERE teamid=in_teamid AND loginid=in_loginid;
  UPDATE team SET members=(SELECT COUNT(*) FROM userteam WHERE teamid=in_teamid) WHERE id=in_teamid;

END
//
DELIMITER ;



DELIMITER //
CREATE PROCEDURE p_team_relative(IN in_teamid INTEGER ,IN in_teamid2 INTEGER )
BEGIN
  SELECT status INTO @status FROM teamteam WHERE teamid = in_teamid2 AND teamid2=in_teamid;
  IF @status IS NULL THEN
    SELECT COUNT(*) INTO @count FROM teamteam WHERE teamid = in_teamid AND teamid2=in_teamid2;
    IF @count>0 THEN
      SELECT 'DUPLICATE_RECORD' AS result;
    ELSE
      INSERT INTO teamteam(teamid,teamid2,time,status) VALUES(in_teamid,in_teamid2,UNIX_TIMESTAMP(),0);
      SELECT 'INVITED' AS result;
    END IF;

  ELSE
    IF @status=0 THEN
      UPDATE teamteam SET status=1 WHERE teamid = in_teamid2 AND teamid2=in_teamid;
      SELECT 'RELATION_CREATED' AS result;
    ELSE
      SELECT 'RELATION_CREATED_BEFORE' AS result;
    END IF;
  END IF;
END
//
DELIMITER ;



DELIMITER //
CREATE PROCEDURE p_conversation(IN in_teamid INTEGER ,IN in_teamid2 INTEGER )
BEGIN
  SELECT id into @id FROM conversation WHERE (teamid=in_teamid AND teamid2=in_teamid2) OR (teamid=in_teamid2 AND teamid2=in_teamid);
  IF @id IS NULL THEN
    INSERT INTO conversation(teamid,teamid2,time,status) VALUES (in_teamid,in_teamid2,UNIX_TIMESTAMP(),1);
    SELECT LAST_INSERT_ID() AS result;
  ELSE
    SELECT @id AS result;
  END IF;

END
//
DELIMITER ;