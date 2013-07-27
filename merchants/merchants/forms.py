from merchants.models import Merchants
from django.forms import ModelForm

class AddMerchatForm(ModelForm):
    class Meta:
        model = Merchants
        fields = ['name', 'description', 'logoUrl', 'tagLine', 'twitterHandle',
                'phone', 'email', 'geoLocation', 'address']

