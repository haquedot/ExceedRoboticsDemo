<!DOCTYPE html>
<html lang="en">

<head>
    <title>Class</title>
    <?php include './partials/header.php' ?>
    <link rel="stylesheet" href="../public/css/custom.css">
</head>

<body>

    <div class="container">
        <div class="row" style="padding-top:30px;">
            <div class="col-md-6">
                <h2>Class List</h2>
            </div>
            <div class="col-md-6" style="padding-top:20px;">
                <form action="./cart.php" class="inline">
                    <button type='button' class='btn' style="float:right"><i class="fa" style="font-size:24px">&#xf07a;</i>
                        <span class='badge badge-warning' id='lblCartCount'> 0 </span></button>
                </form>
            </div>
        </div>
        <div class="row" style="padding-top:50px;">
            <table class="table table-striped" style="width:100%" id="classListTable">
                <thead>
                    <tr>
                        <th>Session</th>
                        <!-- <th>Location</th> -->
                        <th>Date</th>
                        <th>Time</th>
                        <th>Minimun Age</th>
                        <th>Tution</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>

    <div id="studentModal" class="modal fade" role="dialog">
        <div class="modal-dialog" style="width:950px;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Add Student</h4>
                </div>
                <form id="studentForm">
                    <div class="modal-body">
                        <div class="row">
                            <div class="form-main">
                                <input type="hidden" value="" id="hidClassId">
                                <input type="hidden" value="" id="hidMinimumAge">
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
                                            <label for="firstname">Date of Birth </label><span id="minimumAgeLabel"></span>
                                            <input type="date" class="form-control dateOfBirth" id="dob" name="dob[]" required>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-3" style="padding-top: 20px;">
                                <button type='button' class='btn' onclick="addStudentForm()">+ Add Student</button>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <input type="submit" class="btn btn-default" value="Submit">
                        <button type='button' class='btn' class="btn btn-default" data-dismiss="modal">Close</button>
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
                <button type='button' class='btn' onclick='DeleteStudentRow(this)'>Remove</button>
            </div>
        </div>
    </div>
</body>

</html>


<?php include './partials/footer.php' ?>
<script src="../public/js/class.js"></script>