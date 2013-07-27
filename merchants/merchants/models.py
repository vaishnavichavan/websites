from django.db import models

class Merchants(models.Model):

    def __unicode__(self):
        return self.name

    name = models.CharField(max_length=200)
    description = models.TextField()
    logoUrl = models.URLField(max_length=2048)
    tagLine = models.CharField(max_length=200)
    twitterHandle = models.CharField(max_length=200)
    phone = models.DecimalField(max_digits=10, decimal_places=0)
    email = models.EmailField()
    geoLocation = models.CharField(max_length=200)
    address = models.TextField()


