from djongo import models
# Create your models here.


class Question(models.Model):
    id_question = models.AutoField()
    question_type = models.BooleanField()
    content = models.TextField()
    answer = models.TextField()

    def __str__(self):
        return self.content


class ReportTeacher(models.Model):
    id_report_teacher = models.AutoField()
    score = models.CharField(max_length=100)

    def __str__(self):
        return self.score


class ReportStudent(models.Model):
    id_report_student = models.AutoField()
    score = models.FloatField()

    def __str__(self):
        return self.score


class Student(models.Model):
    id_student = models.AutoField()
    first_name = models.CharField(max_lenght=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()
    birth_date = models.DateField(max_length=10)

    def __str__(self):
        return '%s %s' % (self.first_name, self.last_name)


class StudentGroup(models.Model):
    id_group = models.AutoField()
    students = models.ForeignKey(Student, on_delete=models.DO_NOTHING)


class OnlineTest(models.Model):
    headline = models.CharField(max_length=100)
    pub_date = models.DateField(max_length=10)
    # report_teacher = models.OneToOneField(ReportTeacher, on_delete=models.CASCADE)
    # report_student = models.ForeignKey(ReportStudent, on_delete=models.CASCADE)
    # questions = models.ForeignKey(Question, on_delete=models.CASCADE)
    # student_groups = models.ForeignKey(StudentGroup, on_delete=models.DO_NOTHING)

    def __str__(self):
        return '%s %s' % (self.headline, self.pub_date)


class Teacher(models.Model):
    id_teacher = models.AutoField()
    first_name = models.CharField(max_lenght=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()
    birth_date = models.DateField(max_length=10)
    # created_tests = models.ForeignKey(OnlineTest, on_delete=models.DO_NOTHING)

    def __str__(self):
        return '%s %s' % (self.first_name, self.last_name)

