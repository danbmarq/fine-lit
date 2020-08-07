from django.test import TestCase
from django.urls import reverse, resolve
from .views import home, blog_post
from .models import Blog

# Create your tests here.


class HomeTests(TestCase):
    def test_home_view_status_code(self):
        url = reverse('home')
        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)

    def test_home_url_resolves_home_view(self):
        view = resolve('/')
        self.assertEquals(view.func, home)


class BlogPostsTests(TestCase):
    def setUp(self):
        Blog.objects.create(name='Django', description='Django board.')

    def test_blog_psot_view_success_status_code(self):
        url = reverse('blog_post', kwargs={'pk': 1})
        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)

    def test_blog_posts_view_not_found_status_code(self):
        url = reverse('blog_post', kwargs={'pk': 99})
        response = self.client.get(url)
        self.assertEquals(response.status_code, 404)

    def test_blog_posts_url_resolves_blog_posts_view(self):
        view = resolve('/blogs/1/')
        self.assertEquals(view.func, blog_post)
    
    def test_blog_post_view_contains_link_back_to_homepage(self):
        blog_post = reverse('blog_post', kwargs={'pk': 1})
        response = self.client.get(blog_post)
        homepage_url = reverse('home')
        self.assertContains(response, 'href="{0}"'.format(homepage_url))

class HomeTests(TestCase):
    def setUp(self):
        self.blog = Blog.objects.create(name='Django', description='Django board.')
        url = reverse('home')
        self.response = self.client.get(url)

    def test_home_view_status_code(self):
        self.assertEquals(self.response.status_code, 200)

    def test_home_url_resolves_home_view(self):
        view = resolve('/')
        self.assertEquals(view.func, home)
    
    def test_home_view_contains_link_to_post_page(self):
        blog_post_url = reverse('blog_post', kwargs={'pk': self.blog.pk})
        self.assertContains(self.response, 'href="{0}"'.format(blog_post_url))
