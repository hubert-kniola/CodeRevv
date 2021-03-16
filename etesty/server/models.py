from djongo import models

# Create your models here.

class Question(models.Model):
    question_type = models.BooleanField()
    content = models.TextField()
    answer = models.TextField()

    def __str__(self):
        return self.content


class ReportTeacher(models.Model):
    score = models.CharField(max_length=100)

    def __str__(self):
        return self.score


class ReportStudent(models.Model):
    score = models.FloatField()

    def __str__(self):
        return self.score


class Student(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()
    birth_date = models.DateField(max_length=10)

    def __str__(self):
        return '%s %s' % (self.first_name, self.last_name)


class StudentGroup(models.Model):
    students = models.ForeignKey(Student, on_delete=models.DO_NOTHING)


class OnlineTest(models.Model):
    headline = models.CharField(max_length=100)
    pub_date = models.DateField(max_length=10)

    def __str__(self):
        return '%s %s' % (self.headline, self.pub_date)


class Teacher(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()
    birth_date = models.DateField(max_length=10)

    def __str__(self):
        return '%s %s' % (self.first_name, self.last_name)

