<!DOCTYPE html>
<html lang="en">

<head>
    <title>Thank you</title>
    <?php include './partials/header.php' ?>
    <link rel="stylesheet" href="../public/css/custom.css">
</head>

<body>
    <div class="overlay"></div>
    <div class="spanner">
        <div class="loader"></div>
        <h3>Loading...</h3>
    </div>
    <div class="container">
        <div class="row">
            <!-- <div>
                <button onclick="printThankYou()">Print this page</button>
            </div>
            <div>
                <h4 style="text-align: center;">Please print this page for your records</h4>
            </div> -->
        </div>
        <div id="tableDiv" class="row" style="padding-top: 50px;">
            <!-- <h2 style="text-align: center;">Registration successful</h2> -->
            <table class="table" id="thankYouTable">
                <thead>
                    <tr>

                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
            <div class="row">
                <h4 style="text-align: center;">You do not need to bring anything with you on trial date,<br /> A confirmation email has been sent to you,<br /> Can't wait to bring a smile on your child's face on the day of trial</h4>
                <h4 style="text-align: center;">You will receive a text message reminder on the day of the trial class</h4>
            </div>

            <div class="row" style="text-align:center">
                <a href="#" onclick="printThankYou()"><i class="fa fa-print" style="font-size:24px;"> Print</i></a>
            </div>
        </div>
    </div>
</body>

</html>


<?php include './partials/footer.php' ?>
<script src="../public/js/thankyou.js"></script>