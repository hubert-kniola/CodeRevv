import uuid
from djongo import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class AuthUser(AbstractUser):
    date_joined = models.DateTimeField()
    email = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    is_active = models.BooleanField()
    role = models.CharField(max_length=10)
    last_login = models.DateTimeField()
    last_name = models.CharField(max_length=50)
    password = models.CharField(max_length=50)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name']

    class Meta:
        managed = False
        db_table = 'auth_user'


class Question(models.Model):
    question_type = models.CharField(max_length=20)
    content = models.CharField(max_length=500)
    answer = models.CharField(max_length=500)
    max_score = models.FloatField(null=True)
    image = models.ImageField(null=True)

    def __str__(self):
        return f'{self.question_type} {self.content} {self.answer} {self.max_score}'

    class Meta:
        abstract = True


class UserAnswer(models.Model):
    question_id = models.IntegerField()
    answer = models.CharField(max_length=500)
    user = models.IntegerField()
    comment = models.CharField(max_length=200)
    score = models.FloatField()

    def __str__(self):
        return self.answer

    class Meta:
        abstract = True


class OnlineTest(models.Model):
    headline = models.CharField(max_length=50)
    pub_test = models.DateField(null=True)
    creator = models.IntegerField(null=True)
    users = models.ArrayField(AuthUser, null=True)
    question = models.EmbeddedField(Question)
    user_answer = models.EmbeddedField(UserAnswer)

    def __str__(self):
        return self.headline


class DjangoAdminLog(models.Model):
    action_flag = models.IntegerField()
    action_time = models.DateTimeField()
    change_message = models.CharField(max_length=50)
    content_type_id = models.IntegerField()
    id = models.IntegerField(primary_key=True)  # AutoField?
    object_id = models.CharField(max_length=50)
    object_repr = models.CharField(max_length=50)
    user_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=50)
    id = models.IntegerField(primary_key=True)  # AutoField?
    model = models.CharField(max_length=50)
    name = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=50)
    applied = models.DateTimeField()
    id = models.IntegerField(primary_key=True)  # AutoField?
    name = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    expire_date = models.DateTimeField()
    session_data = models.CharField(max_length=50)
    session_key = models.CharField(primary_key=True, max_length=50)

    class Meta:
        managed = False
        db_table = 'django_session'


class DjangoSite(models.Model):
    domain = models.CharField(unique=True, max_length=50)
    id = models.IntegerField(primary_key=True)  # AutoField?
    name = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'django_site'


class ServerOnlinetest(models.Model):
    headline = models.CharField(max_length=50)
    id = models.IntegerField(primary_key=True)  # AutoField?
    pub_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'server_onlinetest'


class ServerOnlinetestUsers(models.Model):
    id = models.IntegerField(primary_key=True)  # AutoField?
    onlinetest_id = models.IntegerField()
    user_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'server_onlinetest_users'
        unique_together = (('onlinetest_id', 'user_id'),)


class ServerUser(models.Model):
    birth_date = models.DateTimeField()
    email = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    id = models.IntegerField(primary_key=True)  # AutoField?
    last_name = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'server_user'

class AuthPermission(models.Model):
    codename = models.CharField(max_length=50)
    content_type_id = models.IntegerField()
    id = models.IntegerField(primary_key=True)  # AutoField?
    # name = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type_id', 'codename'),)