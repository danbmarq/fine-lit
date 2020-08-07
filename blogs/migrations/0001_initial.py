# Generated by Django 3.0.8 on 2020-07-19 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Blog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60, unique=True)),
                ('description', models.CharField(max_length=150)),
                ('subject', models.TextField(max_length=4000)),
                ('last_updated', models.DateTimeField(auto_now_add=True)),
                ('image', models.ImageField(upload_to='')),
                ('topic', models.CharField(choices=[('1', 'Budgeting'), ('2', 'Saving'), ('3', 'Investing')], default='1', max_length=150)),
            ],
        ),
    ]