<!DOCTYPE html>
<html lang="en">

<head>
    <title>Cart</title>
    <?php include './partials/header.php' ?>
    <link rel="stylesheet" href="../public/css/login.css">
    <link rel="stylesheet" href="../public/css/custom.css">
</head>

<body>

    <div class="container">
        <form action="./cart.php" class="inline">
            <button style="float:right"><i class="fa" style="font-size:24px">&#xf07a;</i>
                <span class='badge badge-warning' id='lblCartCount'> 0 </span></button>
        </form>
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <div class="panel panel-login">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-xs-6">
                                <a href="#" class="active" id="login-form-link">Login</a>
                            </div>
                            <div class="col-xs-6">
                                <a href="#" id="register-form-link">Register</a>
                            </div>
                        </div>
                        <hr>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-lg-12">
                                <form id="login-form" action="" method="post" role="form" style="display: block;">
                                    <p id="loginErr" style="color: red;" class="hide"></p>
                                    <div id="login-form-fields">
                                    </div>
                                    <!-- <div class="form-group text-center">
										<input type="checkbox" tabindex="3" class="" name="remember" id="remember">
										<label for="remember"> Remember Me</label>
									</div> -->
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-6 col-sm-offset-3">
                                                <input type="submit" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login" value="Log In">
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div class="form-group">
										<div class="row">
											<div class="col-lg-12">
												<div class="text-center">
													<a href="https://phpoll.com/recover" tabindex="5" class="forgot-password">Forgot Password?</a>
												</div>
											</div>
										</div>
									</div> -->
                                </form>
                                <form id="register-form" action="" method="post" role="form" style="display: none;">
                                    <p id="registrationErr" style="color: red;" class="hide"></p>
                                    <div id="register-form-fields">
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-6 col-sm-offset-3">
                                                <input type="submit" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" value="Register Now">
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>


<?php include './partials/footer.php' ?>
<script src="../public/js/login.js"></script>