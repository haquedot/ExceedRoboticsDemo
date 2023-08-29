<!DOCTYPE html>
<html lang="en">

<head>
    <title>Class</title>
    <?php include './partials/header.php' ?>
    <link rel="stylesheet" href="../public/css/custom.css">
</head>

<body>

    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <h2>Registration Details</h2>
                <h4>Please provide the all the details to proceed</h4>
            </div>
            <div class="col-md-6" style="padding-top:40px;">
                <form action="./cart.php" class="inline">
                    <button style="float:right"><i class="fa" style="font-size:24px">&#xf07a;</i>
                        <span class='badge badge-warning' id='lblCartCount'> 0 </span></button>
                </form>
            </div>
        </div>
        <div class="row" style="padding-top:50px;">
            <div class="col-md-2">
                <select class="form-control" id="age">
                <option value="">AGE</option>
                        <option value="4001214">7 Years Old</option>
                        <option value="4001230">8 Years Old</option>
                        <option value="4001215">9-11 Years Old</option>
                        <option value="4001216">12-15 Years Old</option>
                </select>
            </div>
            <div class="col-md-2">
                <select class="form-control" id="location">
                    <option value="">LOCATION</option>
                    <option value="2">Mississauga</option>
                    <option value="1">Thornhill</option>
                    <option value="3">Richmond Hill</option>
                </select>
            </div>
            <div class="col-md-2">
                <input class="form-control" type="text" id="parentEmail" name="parentEmail" value="" placeholder="Email" />
            </div>
            <div class="col-md-2">
                <select class="form-control" id="semester">
                    <option value="">SEMESTER</option>
                </select>
            </div>
            <div class="col-md-4">
                <button type="button" class="btn register-apply-btn" onclick="submitRegistration(this)">Apply</button>
            </div>
        </div>
    </div>
</body>

</html>


<?php include './partials/footer.php' ?>
<script src="../public/js/registration-detail.js"></script>