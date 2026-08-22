# class Subject(models.Model):
#     name = models.CharField(max_length=50)
#     description = models.TextField()
#     difficulty = models.IntegerField(default=0)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.name

# class Student(models.Model):
#     name = models.CharField(max_length=50)

#     def __str__(self):
#         return self.name

# class Course(models.Model):
#     name = models.CharField(max_length=30)
#     students = models.ManyToManyField(Student, related_name="courses")

#     def __str__(self):
#         return self.name