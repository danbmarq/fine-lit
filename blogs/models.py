from django.db import models

# Create your models here.
topics = (
    ("1", "Budgeting"),
    ("2", "Savings"),
    ("3","Investing"),
)

class Blog(models.Model):
    name = models.CharField(max_length=60, unique=True)
    description = models.CharField(max_length=150)
    subject = models.TextField(max_length=40000)
    last_updated = models.DateTimeField(auto_now_add=True)
    image = models.ImageField()
    topic = models.CharField(max_length=150, choices=topics)
    slug = models.SlugField(null=True)

    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return reverse( kwargs={'slug': self.slug})

