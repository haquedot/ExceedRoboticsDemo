<!DOCTYPE html>
<html lang="en">

<head>
    <title>Cart</title>
    <?php include './partials/header.php' ?>
    <link rel="stylesheet" href="../public/css/custom.css">
</head>

<body>

    <div class="container">
        <div class="row">
            <h2>Cart</h2>
            <form action="./cart.php" class="inline">
                <button type="button" class="btn" style="float:right"><i class="fa" style="font-size:24px">&#xf07a;</i>
                    <span class='badge badge-warning' id='lblCartCount'> 0 </span></button>
            </form>
        </div>
        <div class="row" id="emtyDiv">
            <h3>Your cart is empty</h3>
            <div class="row" style="float:left; padding-left:20px;">
                <form class="inline">
                    <button type="button" class="btn" onclick="addClassRedirection()">Add class</button>
                </form>
            </div>
        </div>
        <div class="row" id="cartTableDiv" style="display: none">
            <table class="table" id="cartTable">
                <thead>
                    <tr>
                        <th>Session</th>
                        <th>No of Students</th>
                        <th>Dates</th>
                        <th>Time</th>
                        <th>Tution</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div class="row" style="float:left; padding-left:20px;">
                <form class="inline">
                    <button type="button" class="btn" onclick="redirectToregistration()">Add class</button>
                </form>
            </div>
            <div class="row" style="float:right">
                <form class="inline">
                    <button type="button" class="btn" onclick="submitCart()">Continue</button>
                </form>
            </div>
            <div class="row" id="couponCodeDiv" style="display:none;">
                <div class="col-md-2 col-md-offset-4">
                    <button type='button' class='btn' for="couponCode" onclick='couponCodeAdd()'>Apply Coupon Code</button>
                </div>
                <div class="col-md-2">
                    <input type='text' class='form-control' id='couponCode' name='couponCode' required><span id='invalidCouponErr' style='color:red; display:none;'></span>
                </div>
            </div>
        </div>
    </div>

    <div id="studentModal" class="modal fade" role="dialog">
        <div class="modal-dialog" style="width:950px;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Student Details</h4>
                </div>
                <form id="studentForm">
                    <div class="modal-body">
                        <div class="row" id="alreadyAddedStudentDiv" style="display: none; padding:10px">
                            <table class="table" id="alreadyAddedStudentTable">
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Date of Birth</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                        <div class="row">
                            <div class="form-main">
                                <input type="hidden" value="" id="hidClassId">
                                <div class="form-block">
                                    <div class="form-group">
                                        <div class="col-sm-3">
                                            <label for="firstname">First Name</label>
                                            <input type="text" class="form-control" id="firstname" placeholder="First Name" name="firstname[]" required>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-3">
                                            <label for="firstname">Last Name</label>
                                            <input type="text" class="form-control" id="lastname" placeholder="Last Name" name="lastname[]" required>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-4">
                                            <label for="firstname">Date of Birth</label>
                                            <input type="date" class="form-control dateOfBirth" id="dob" name="dob[]" required>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-3" style="padding-top: 20px;">
                                <button type="button" class="btn" onclick="addStudentForm()">+ Add Student</button>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <input type="submit" class="btn btn-default" value="Apply">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </form>
            </div>

        </div>
    </div>
    <div class="form-block-sample" style="display:none">
        <div class="form-group">
            <div class="col-sm-3">
                <input type="text" class="form-control " id="firstname" placeholder="First Name" name="firstname[]" required>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-3">
                <input type="text" class="form-control" id="lastname" placeholder="Last Name" name="lastname[]" required>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-4">
                <input type="date" class="form-control dateOfBirth" id="dob" name="dob[]" required>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-2">
                <button type="button" class="btn" onclick='DeleteStudentRow(this)'>Remove</button>
            </div>
        </div>
    </div>

    <div id="showStudentModal" class="modal fade" role="dialog">
        <div class="modal-dialog" style="width:950px;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Student Details</h4>
                </div>
                <form id="studentForm">
                    <div class="modal-body">
                        <div class="row" id="alreadyAddedShowStudentDiv" style="padding:10px">
                            <table class="table" id="alreadyAddedShowStudentTable">
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Date of Birth</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    </div>

    <div id="displayStudentModal" class="modal fade" role="dialog">
        <div class="modal-dialog" style="width:950px;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Student Details</h4>
                </div>
                <form id="studentForm">
                    <div class="modal-body">
                        <div class="row" id="displayStudentDiv" style="padding:10px">
                            <table class="table" id="displayStudentTable">
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Date of Birth</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    </div>
</body>

</html>


<?php include './partials/footer.php' ?>
<script src="../public/js/cart.js"></script>