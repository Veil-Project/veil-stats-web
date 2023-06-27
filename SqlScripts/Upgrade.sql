ALTER Table BlockData
DROP COLUMN NextSuperBlock
GO

ALTER Table BlockData
ALTER COLUMN BlockHash varchar(75) NOT NULL
GO 

ALTER Table BlockData
ADD BlockType int NULL
GO

UPDATE BlockData
SET BlockType = 0 
GO

ALTER Table BlockData
ALTER COLUMN BlockType int NOT NULL
GO


ALTER TABLE BlockData
DROP COLUMN TxCount
GO


ALTER Table [ZerocoinSupply]
ALTER COLUMN Denom varchar(15) NOT NULL
GO 

ALTER PROCEDURE [dbo].[sp_GetDiffLineGraphData] 
	@DiffType int,
	@DateRange int
AS
BEGIN

	DECLARE @BlocksBack int = 10080; -- 7 Days

	IF(@DateRange = 2)
	BEGIN 
		SET @BlocksBack = 43200; -- 30 Days
	END
	IF(@DateRange = 3)
	BEGIN 
		SET @BlocksBack = 86400; -- 60 Days
	END
	IF(@DateRange = 4)
	BEGIN 
		SET @BlocksBack = 129600; -- 90 Days
	END
		

	IF (@DiffType = 1)
	BEGIN
		SELECT BlockDate, PosDiff AS 'Diff'
		FROM [Veil].[dbo].[BlockData]
		WHERE BlockID >= ((SELECT MAX(BlockID) FROM [Veil].[dbo].[BlockData]) - @BlocksBack)
		ORDER BY BlockID 
		RETURN
	END 

 	IF (@DiffType = 2)
	BEGIN
		SELECT BlockDate, PowDiff AS 'Diff'
		FROM [Veil].[dbo].[BlockData]
		WHERE BlockID >= ((SELECT MAX(BlockID) FROM [Veil].[dbo].[BlockData]) - @BlocksBack)		
		ORDER BY BlockID 
		RETURN
	END 
END
GO
