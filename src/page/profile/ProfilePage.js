import React from 'react'

const ProfilePage = () => {
    return (
        <div>
            <div class="tab-pane" id="account">
                <form action="#" class="form">
                    <div class="row">
                        <div class="col-sm-6">
                            <label>Họ *</label>
                            <input type="text" class="form-control" name="first_name" required />
                        </div>
                        <div class="col-sm-6">
                            <label>Tên *</label>
                            <input type="text" class="form-control" name="last_name" required />
                        </div>
                    </div>
                    <label>Email *</label>
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