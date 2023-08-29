<!DOCTYPE html>
<html lang="en">

<head>
    <title>Checkout</title>
    <?php include './partials/header.php' ?>
    <link rel="stylesheet" href="../public/css/custom.css">
    <link rel="stylesheet" href="../public/css/checkout.css">
</head>

<body>
    <div class="overlay"></div>
    <div class="spanner">
        <div class="loader"></div>
        <h3>Loading...</h3>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="col-md-3">
                    <h2>Checkout Cart</h2>
                </div>
                <div class="col-md-6" style="padding-top:20px;">
                    <h4><span id="coursesCount">0</span> Course(s) Selected</h4>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-8" id="checkoutListTable">

                    </div>
                    <div class="col-md-3 col-md-offset-1" style="border:solid 1px;">
                        <div class="row">
                            <div class="col-md-8">
                                <h5><b>Sub-Total</b></h5>
                            </div>

                            <div class="col-md-4">
                                <h5 style="float:right;"><b><span id="subTotal"></span></b></h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-8">
                                <h5><b>HST</b></h5>
                            </div>

                            <div class="col-md-4">
                                <h5 style="float:right;"><b><span id="hst"></span></b></h5>
                            </div>
                        </div>
                        <div class="row" id="discountDivRow" style="display:none">
                            <div class="col-md-8">
                                <h5><b>Discount</b></h5>
                            </div>

                            <div class="col-md-4">
                                <h5 style="float:right;"><b><span id="discount"></span></b></h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-8">
                                <h5><b>Total</b></h5>
                            </div>

                            <div class="col-md-4">
                                <h5 style="float:right;"><b><span id="total"></span></b></h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-8">
                                <h5><b>Today's Payment</b></h5>
                            </div>

                            <div class="col-md-4">
                                <h5 style="float:right;"><b><span id="todayPayment"></span></b></h5>
                            </div>
                        </div>
                        <div class="row" style="padding-top:20px">
                            <div class="col-md-12">
                                <input type="checkbox" class="termsAndConditionChkbox">
                                <label style="display: contents!important;">
                                    By clicking this you will be confirmed the declaration of payment. <a role="button" onclick="openTermsAndCondition()"><u>Terms & conditions</u></a>
                                </label>
                            </div>
                        </div>

                        <div class="row" style="height:40px">
                            <div class="col-md-12 vertical-center">
                                <button class="checkout-btn" onclick="submitCheckout()">Checkout</button>
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

        <div class="row">
            <div class="col-md-12">
                <p style="text-align: center; padding-top:50px"><b>Disclaimer: All Payments are secured as per the government rules and norms.</b></p>
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

    <div id="termsAndConditionsModal" class="modal fade" role="dialog">
        <div class="modal-dialog" style="width:950px;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" style="text-align:center">Terms & conditions</h4>
                </div>
                <div class="modal-body">
                    <div class="row" style="padding:10px 50px 20px;">
                        <p>This is to confirm that the declaration has been carefully read, understood & made by me/us.
                            I am authorizing the entity/ Corporate to debit my account, based on the instructions as agreed and signed by me.
                            I have understood that I am authorised to cancel/amend this mandate by appropriately communicating the
                            cancellation / amendment request to the User entity / Corporate or the bank where I have authorized the debit.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</body>

</html>


<?php include './partials/footer.php' ?>
<script src="../public/js/checkout.js"></script>