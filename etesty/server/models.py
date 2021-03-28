from djongo import models
# Create your models here.


class AuthUser(models.Model):
    date_joined = models.DateTimeField()
    email = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    id = models.IntegerField(primary_key=True)  # AutoField?
    is_active = models.BooleanField()
    is_staff = models.BooleanField()
    is_superuser = models.BooleanField()
    last_login = models.DateTimeField()
    last_name = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    username = models.CharField(unique=True, max_length=50)

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


class AccountEmailaddress(models.Model):
    email = models.CharField(unique=True, max_length=50)
    id = models.IntegerField(primary_key=True)  # AutoField?
    primary = models.BooleanField()
    user_id = models.IntegerField()
    verified = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'account_emailaddress'


class AccountEmailconfirmation(models.Model):
    created = models.DateTimeField()
    email_address_id = models.IntegerField()
    id = models.IntegerField(primary_key=True)  # AutoField?
    key = models.CharField(unique=True, max_length=50)
    sent = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'account_emailconfirmation'


class AuthGroup(models.Model):
    id = models.IntegerField(primary_key=True)  # AutoField?
    name = models.CharField(unique=True, max_length=50)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group_id = models.IntegerField()
    id = models.IntegerField(primary_key=True)  # AutoField?
    permission_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group_id', 'permission_id'),)


class AuthPermission(models.Model):
    codename = models.CharField(max_length=50)
    content_type_id = models.IntegerField()
    id = models.IntegerField(primary_key=True)  # AutoField?
    name = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type_id', 'codename'),)




class AuthUserGroups(models.Model):
    group_id = models.IntegerField()
    id = models.IntegerField(primary_key=True)  # AutoField?
    user_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user_id', 'group_id'),)


class AuthUserUserPermissions(models.Model):
    id = models.IntegerField(primary_key=True)  # AutoField?
    permission_id = models.IntegerField()
    user_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user_id', 'permission_id'),)


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


class SocialaccountSocialaccount(models.Model):
    date_joined = models.DateTimeField()
    extra_data = models.CharField(max_length=50)
    id = models.IntegerField(primary_key=True)  # AutoField?
    last_login = models.DateTimeField()
    provider = models.CharField(max_length=50)
    uid = models.CharField(max_length=50)
    user_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'socialaccount_socialaccount'
        unique_together = (('provider', 'uid'),)


class SocialaccountSocialapp(models.Model):
    client_id = models.CharField(max_length=50)
    id = models.IntegerField(primary_key=True)  # AutoField?
    key = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    provider = models.CharField(max_length=50)
    secret = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'socialaccount_socialapp'


class SocialaccountSocialappSites(models.Model):
    id = models.IntegerField(primary_key=True)  # AutoField?
    site_id = models.IntegerField()
    socialapp_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'socialaccount_socialapp_sites'
        unique_together = (('socialapp_id', 'site_id'),)


class SocialaccountSocialtoken(models.Model):
    account_id = models.IntegerField()
    app_id = models.IntegerField()
    expires_at = models.DateTimeField()
    id = models.IntegerField(primary_key=True)  # AutoField?
    token = models.CharField(max_length=50)
    token_secret = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'socialaccount_socialtoken'
        unique_together = (('app_id', 'account_id'),)
