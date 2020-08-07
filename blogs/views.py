from django.shortcuts import render, get_object_or_404
from .models import Blog
# Create your views here.

def home(request):
    blogs_budgeting = Blog.objects.all().filter(topic = "1")
    blogs_saving = Blog.objects.all().filter(topic = "2")
    blogs_investing = Blog.objects.all().filter(topic = "3")

    return render(request, 'home.html', {'blogs_budgeting': blogs_budgeting, 'blogs_saving':blogs_saving, 'blogs_investing':blogs_investing})


def about(request):
    return render(request, 'about.html')

def calculator(request):
    return render(request, 'calculator.html')


def blog_post(request, pk):
   blog = get_object_or_404(Blog, pk=pk)
   return render(request, 'topics.html', {'blog': blog})