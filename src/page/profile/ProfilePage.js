import React from 'react'

const ProfilePage = () => {
    return (
        <div>
            <div class="tab-pane" id="account">
                <form action="#" class="form">
                    <div class="row">
                        <div class="col-sm-6">
                            <label>First Name *</label>
                            <input type="text" class="form-control" name="first_name" required />
                        </div>
                        <div class="col-sm-6">
                            <label>Last Name *</label>
                            <input type="text" class="form-control" name="last_name" required />
                        </div>
                    </div>
                    <label>Display Name *</label>
                    <input type="text" class="form-control mb-0" name="display_name" required />
                    <small class="d-block form-text mb-7">This will be how your name will be displayed
                        in the account section and in reviews</small>
                    <label>Email Address *</label>
                    <input type="email" class="form-control" name="email" required />
                    <fieldset>
                        <legend>Password Change</legend>
                        <label>Current password (leave blank to leave unchanged)</label>
                        <input type="password" class="form-control" name="current_password" />
                        <label>New password (leave blank to leave unchanged)</label>
                        <input type="password" class="form-control" name="new_password" />
                        <label>Confirm new password</label>
                        <input type="password" class="form-control" name="confirm_password" />
                    </fieldset>
                    <button type="submit" class="btn btn-primary">SAVE CHANGES</button>
                </form>
            </div>
        </div>
    )
}

export default ProfilePage