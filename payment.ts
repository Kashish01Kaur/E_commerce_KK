const totalPrice = localStorage.getItem("totalPrice");
const totalPriceElement = document.getElementById("totalPrice");

if(totalPriceElement) {
  totalPriceElement.textContent = `$${totalPrice}`;
}

function submitPayment(): void {
  let amount = JSON.parse(localStorage.getItem('totalPrice') || '0');
  razorPayPopUp(amount);
}

function razorPayPopUp(amount: number){
  var options = {
    "key": "rzp_test_vKaoNtGrY0ktH5", 
    "amount": amount*100, 
    "currency": "INR",
    "name": "Acme Corp", 
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": "", 
    "handler": function (response: any){
      alert("Payment Successfully Made! Thank You for Shopping with us:)"); 
      window.location.href = "index.html";
    },
    "prefill": { 
        "name": "Gaurav Kumar", 
        "email": "gaurav.kumar@example.com", 
        "contact": "9000090000"  
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
  };
  var rzp1: any = new Razorpay(options);
  rzp1.on('payment.failed', function (response: any){
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
  });
  document.getElementById('rzp-button1')!.onclick = function(e){
    rzp1.open();
    e.preventDefault();
  }
}