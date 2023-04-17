var program = new function () {

    var paypal_Main = async function () {
        // init
        $("#box-subscrption").hide().siblings().hide()
        $("button").button();
        $('#btn-paypal-show').click(payapl_showButtons)
    }
    var paypal_onCreate = function (data, actions) {
        var planID = $("#btn-paypal-show").attr("plan-id")
        return actions.subscription.create({
            "plan_id": planID,
            "application_context": {
                "shipping_preference": "NO_SHIPPING"
            }
        });
    }
    var paypal_onApprove = function (data, actions) {
        // update the subscription data and trigger click
        $("#btn-paypal-approve").attr("sub-data", JSON.stringify(data)).click()
    }
    var payapl_showButtons = function () {
        $("#box-subscrption").show().siblings().hide()
        paypal.Buttons({
            style: { shape: 'rect', color: 'gold', layout: 'vertical', label: 'subscribe' },
            createSubscription: paypal_onCreate,
            onApprove: paypal_onApprove,
            onCancel: err => { },
            onError: err => { }
        }).render('#paypal-buttons');
    }
    this.main = function () { return paypal_Main.apply(this, arguments) }
}

$(() => { program.main() })
