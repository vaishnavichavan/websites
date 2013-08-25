
var contentGenerator = {

    linkIsForCoupon : function(href, couponIds)
    {
        for(var i =0 ; i< couponIds.length; i++)
        {
            if ( href.indexOf(couponIds[i]) >= 0 ){
                return true;
            }
        }
        return false;
    },

    constructTable : function(titles, hrefs, couponCodes, couponIds) 
    {

        if(titles != null && titles.length >0)
        {
            items = titles.length;

            var body=document.getElementsByTagName('body')[0];
            var couponsTable=document.createElement('table');
            couponsTable.setAttribute("id", "couponsTable");
            couponsTable.style.width='100%';

            var hr=document.createElement('tr');
            var th1=document.createElement('th');
            var headerText1 = document.createTextNode("Coupons");
            th1.appendChild(headerText1);
            hr.appendChild(th1);

            var couponsTbody=document.createElement('tbody');
            hr.setAttribute("align", "left");
            couponsTbody.appendChild(hr);


            var dealsTable=document.createElement('table');
            dealsTable.setAttribute("id", "dealsTable");
            dealsTable.style.width='100%';

            var hr=document.createElement('tr');
            var th1=document.createElement('th');
            var headerText1 = document.createTextNode("Deals");
            th1.appendChild(headerText1);
            hr.appendChild(th1);

            var dealsTbody=document.createElement('tbody');
            hr.setAttribute("align", "left");
            dealsTbody.appendChild(hr);



            var items;
            for(var i=0, k=0;i<items;i++)
            {
                var tr=document.createElement('tr');
                var linkForCoupon = false;
                for(var j=0;j<1;j++)
                {
                    var td1=document.createElement('td');
                    var link = document.createElement("a");

                    link.setAttribute("href", hrefs[i]);
                    link.setAttribute("target", "_blank");
                    link.className = "className";

                    var linkText;

                    if(contentGenerator.linkIsForCoupon(hrefs[i], couponIds))
                    {
                        linkText = document.createTextNode(couponCodes[k++]); 
                        link.appendChild(linkText);
                        td1.appendChild(link);

                        var td2=document.createElement('td');
                        td2.appendChild(document.createTextNode(titles[i]))

                        tr.appendChild(td1)
                        tr.appendChild(td2)

                        couponsTbody.appendChild(tr);
                        couponsTable.appendChild(couponsTbody);
                    }
                    else
                    {
                        linkText = document.createTextNode(titles[i]);
                        link.appendChild(linkText);
                        td1.appendChild(link);
                        tr.appendChild(td1);
                        dealsTbody.appendChild(tr);
                        dealsTable.appendChild(dealsTbody);
                    }

                }
            }
            body.appendChild(couponsTable);
            body.appendChild(dealsTable);
        }
        else
        {
        }
    },

    requestServer: function(target)
    {
        var req = new XMLHttpRequest();
        var baseUrl = "http://www.coupondunia.in/";
        var searchUrl =  baseUrl.concat(target);
        req.open("GET", searchUrl, true);
        req.onload = function(e)
        {
            if( req.readyState == 4)
            {
                if(req.status == 200)
                {
                    responseText = req.responseText;
                    var couponCodes = $(".coupon_code_text", responseText).map(function(){return $(this).attr('code')}).get();
                    var hrefs = $(".couponTitle", responseText).map(function(){return $(this).attr('href')}).get();
                    var titles = $(".couponTitle", responseText).map(function(){return $(this).text()}).get();
                    var couponIds = $(".coupon_code_text", responseText).map(function(){return $(this).attr('id')}).get();

                    //substring each element to store only the couponId.
                    for(var i =0; i<couponIds.length; i++){ 
                        temp = couponIds[i];
                        couponIds[i]= temp.substring(12);
                    }


                contentGenerator.constructTable(titles, hrefs, couponCodes, couponIds);
                }
                else
                {
                    console.error(req.statusText)
                }
            }
        };
        req.onerror = function (e)
        {
            console.error(req.statusText);
            console.error(req.status);
        };
        req.send(null);
    },

    };


    $(document).ready(function() {
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            setSource(tabs[0].url);
        });

        function setSource(completeUrl)
        {
            var target = completeUrl.split(".")[1];
            contentGenerator.requestServer(target);
        }

    })

