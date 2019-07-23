from django.contrib import admin
from .models import Todo

# Register your models here.
class TodoAdmin(admin.ModelAdmin): #created CLass for DAta Fields to display
    list_display = ('title', 'description', 'completed')


admin.site.register(Todo, TodoAdmin) #passed Main Models and Name Parameters