from django.http import HttpResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, render_to_response, redirect
from merchants.forms import AddMerchatForm
from merchants.models import Merchants

# for debugging purpose
#import pdb; pdb.set_trace()
def index(request):
    return render(request, 'index.html')

@csrf_exempt
def processClick(request):
    buttonValue = ""
    if request.method == "POST":
        buttonValue = request.POST['button']
        if buttonValue == "Add Merchant":
            return render(request, 'addMerchants.html')
        elif buttonValue == "View Merchants" :
            return redirect('/merchants/all/')
        else:
            return HttpResponseBadRequest("Operation not recognized.")


# turn off csrf to avoid writing index.html with python templates. 
# Simple html is fine.
@csrf_exempt
def addMerchant(request):
    if request.method == "POST":
        merchantInfo = AddMerchatForm(request.POST)
        if merchantInfo.is_valid():
            merchant = merchantInfo.save()
            return HttpResponse("Merchant successfully added.")
        else:
            errorMsg=""
            for error in merchantInfo.errors:
                errorMsg += error
                errorMsg +=" "
            return HttpResponse("Please correct the following input: " + errorMsg)
    else:
        return render(request, 'index.html')

def displayMerchants(request):
    merchantsList = Merchants.objects.all()

    if merchantsList.count() == 0 :
        return HttpResponse("Currently there is no information available about Merchants.")
    else:
        return render_to_response('merchantsList.html', {'merchantsList': merchantsList})
