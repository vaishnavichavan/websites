from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',

    url(r'^$', 'merchants.views.index', name='index'),
    url(r'^processClick/$', 'merchants.views.processClick', name='processClick'),
    url(r'^add/$', 'merchants.views.addMerchant'),
    url(r'^merchants/all/$', 'merchants.views.displayMerchants'),
    # Examples:
    # url(r'^$', 'merchants.views.home', name='home'),
    # url(r'^merchants/', include('merchants.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
