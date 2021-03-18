from djongo import models

# Create your models here.


class User(models.Model):
    first_name = models.TextField(max_length=20)
    last_name = models.TextField(max_length=20)
    email = models.TextField()
    birth_date = models.DateField(null=True)


class Question(models.Model):
    question_type = models.TextField()
    content = models.TextField()
    answer = models.TextField()
    max_score = models.FloatField(null=True)
    image = models.ImageField(null=True)

    def __str__(self):
        return self.content


class UserAnswer(models.Model):
    question_id = models.IntegerField()
    answer = models.TextField()
    user = User
    comment = models.TextField()
    score = models.FloatField()


class OnlineTest(models.Model):
    headline = models.TextField()
    pub_test = models.DateField(null=True)
    creator = User
    users = models.ManyToManyField(User)
    question = models.ManyToManyField(Question)
    user_answer = models.ManyToManyField(UserAnswer)




