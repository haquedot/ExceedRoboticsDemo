<!DOCTYPE html>
<html lang="en">

<head>
    <title>Checkout</title>
    <?php include './partials/header.php' ?>
    <link rel="stylesheet" href="../public/css/custom.css">
    <link rel="stylesheet" href="../public/css/billing.css">
</head>

<body>
    <div class="overlay"></div>
    <div class="spanner">
        <div class="loader"></div>
        <h3>Loading...</h3>
    </div>
    <div class="container">
        <div class="row" style="padding-top: 30px;">
            <div class="col-md-3 col-md-offset-4">
                <label for="sel-options" id="paymentMethodLabel"></label>
                <select id="paymentMethod" class="form-control">
                </select>
            </div>
        </div>

        <div class="row" style="padding-top: 30px;">
            <div class="col-md-6" style="border:solid 1px;">
                <div class="row" style="padding-bottom: 30px;">
                    <div class="col-md-12" style="text-align: center;">
                        <label for="sel-options">Billing Information</label>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <form id="billing-form" role="form">
                            <p id="billingErr" style="color: red;" class="hide"></p>
                            <div id="billing-form-fields">

                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-5 col-md-offset-1">
                <div class="row">
                    <div class="col-md-12" style="border:solid 1px;">
                        <div class="row" style="padding-bottom: 30px;">
                            <div class="col-md-12" style="text-align: center;">
                                <label for="sel-options">Payment Information</label>
                            </div>
                        </div>
                        <form id="payment-form" action="" method="post" role="form">
                            <p id="paymentErr" style="color: red;" class="hide"></p>
                            <div id="payment-form-fields">

                            </div>
                        </form>
                    </div>
                    <div class="col-md-12" style="border:solid 1px; padding-top:10px; margin-top:10px">
                        <div class="row">
                            <div class="col-md-6">
                                <h4><b>Today's Payment</b></h4>
                            </div>

                            <div class="col-md-6">
                                <h4 style="float:right;"><b><span id="total"></span></b></h4>
                            </div>
                        </div>

                        <div class="row" style="height:40px">
                            <div class="col-md-12 vertical-center">
                                <button class="paynow-btn" onclick="payNow()">Pay Now</button>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <hr style="border:0.5px solid black">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <p style="text-align: center;">You will be redirect to payment page to fill in personal information</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>

    <div id="termAndConditionModal" class="modal fade" role="dialog">
        <div class="modal-dialog" style="width:950px;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" style="text-align: center;">Terms and conditions</h4>
                </div>
                <form id="studentForm">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-10 col-md-offset-1">
                                <p>
                                    A Terms and Conditions agreement acts as a legal contract between you (the company) and the user. It's where you maintain your rights to exclude users from your app in the event that they abuse your website/app, set out the rules for using your service and note other important details and disclaimers.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>

</html>


<?php include './partials/footer.php' ?>
<script src="../public/js/billing.js"></script>