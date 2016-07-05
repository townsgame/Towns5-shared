/**
 * @author ©Towns.cz
 * @fileOverview Creates class T.Resources
 */
//======================================================================================================================



module T {

    interface UserProfile {
        username: 'string';
        name: 'string';
        surname: 'string';
        email: 'string';
    }


    export class User {


        profile: UserProfile;

        /**
         * @param {object} user raw user data
         */
        constructor(user: User) {

            for (var key in user) {
                var this_key = key;
                this[this_key] = user[key];
            }

        }


        /**
         *
         * @returns {string} HTML code of users signature
         */
        getSignatureHTML():string {

            var name;

            if (this.profile.name || this.profile.surname) {

                name = this.profile.name + ' ' + this.profile.surname;

            } else {

                name = this.profile.username;

            }


            var email_md5 = md5(this.profile.email);


            var signature_html = `

                <div class="user-signature">
                    <img class="user-image" src="https://1.gravatar.com/avatar/` + email_md5 + `?s=80&r=pg&d=mm">

                    <div class="user-signature-text">
                        <h1 class="user-name">` + name + `</h1>
                        <p>` + this.profile.signature.html2text() + `</p>
                    </div>

                </div>

            `;

            return (signature_html);

        }


    }


}