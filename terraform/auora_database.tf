resource "aws_rds_cluster" "user_db_cluster" {
  cluster_identifier      = "user-db-cluster"
  engine                  = "aurora-mysql"  # or "aurora-postgresql"
  master_username         = "user_admin"
  master_password         = "Swamy123"
  database_name           = "user"
  db_subnet_group_name    = aws_db_subnet_group.aurora_subnet_group.name
  backup_retention_period = 7
  preferred_backup_window = "07:00-09:00"
  tags = {
    Name = "user-db-cluster"
  }
}

resource "aws_rds_cluster_instance" "user_db_instance" {
  count                = 2
  cluster_identifier  = aws_rds_cluster.user_db_cluster.id
  instance_class      = "db.r5.large"
  engine              = "aurora-mysql"  # or "aurora-postgresql"
  tags = {
    Name = "user-db-instance-${count.index}"
  }
}

resource "aws_rds_cluster" "expense_db_cluster" {
  cluster_identifier      = "expense-db-cluster"
  engine                  = "aurora-mysql"  # or "aurora-postgresql"
  master_username         = "expense_admin"
  master_password         = "Swamy123"
  database_name           = "expense"
  db_subnet_group_name    = aws_db_subnet_group.aurora_subnet_group.name
  backup_retention_period = 7
  preferred_backup_window = "07:00-09:00"
  tags = {
    Name = "expense-db-cluster"
  }
}

resource "aws_rds_cluster_instance" "expense_db_instance" {
  count                = 2
  cluster_identifier  = aws_rds_cluster.expense_db_cluster.id
  instance_class      = "db.r5.large"
  engine              = "aurora-mysql"  # or "aurora-postgresql"
  tags = {
    Name = "expense-db-instance-${count.index}"
  }
}
