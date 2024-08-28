# Generated by Django 4.1.3 on 2024-08-18 03:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_remove_group_created_at'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='usergroup',
            unique_together=None,
        ),
        migrations.RemoveField(
            model_name='usergroup',
            name='group',
        ),
        migrations.RemoveField(
            model_name='usergroup',
            name='user',
        ),
        migrations.DeleteModel(
            name='Group',
        ),
        migrations.DeleteModel(
            name='User',
        ),
        migrations.DeleteModel(
            name='UserGroup',
        ),
    ]
