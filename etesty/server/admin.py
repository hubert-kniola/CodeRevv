from django.contrib import admin

from .models import *

# Register your models here.


class AuthorAdmin(admin.ModelAdmin):
    pass


# admin.site.register(Question, AuthorAdmin)
# admin.site.register(ReportTeacher, AuthorAdmin)
# admin.site.register(ReportTeacher, AuthorAdmin)
# admin.site.register(Student, AuthorAdmin)
# admin.site.register(StudentGroup, AuthorAdmin)
# admin.site.register(OnlineTest, AuthorAdmin)
# admin.site.register(Teacher, AuthorAdmin)
