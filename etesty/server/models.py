from djongo import models

# Create your models here.


class User(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.CharField(max_length=30)
    birth_date = models.DateField(null=True)
    password = models.CharField(max_length=20, null=True)


class Question(models.Model):
    question_type = models.CharField(max_length=20)
    content = models.CharField(max_length=500)
    answer = models.CharField(max_length=500)
    max_score = models.FloatField(null=True)
    image = models.ImageField(null=True)

    def __str__(self):
        return self.content


class UserAnswer(models.Model):
    question_id = models.IntegerField()
    answer = models.CharField(max_length=500)
    user = User
    comment = models.CharField(max_length=200)
    score = models.FloatField()


class OnlineTest(models.Model):
    headline = models.CharField(max_length=50)
    pub_test = models.DateField(null=True)
    creator = User
    users = models.ManyToManyField(User)
    question = models.ManyToManyField(Question)
    user_answer = models.ManyToManyField(UserAnswer)




