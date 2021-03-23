from djongo import models
# Create your models here.


class User(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.CharField(max_length=30)
    birth_date = models.DateField(null=True)
    password = models.CharField(max_length=20, null=True)

    def __str__(self):
        return self.first_name, ' ', self.last_name


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
    users = models.ManyToManyField(User)
    question = models.EmbeddedField(Question)
    user_answer = models.EmbeddedField(UserAnswer)

    def __str__(self):
        return self.headline




