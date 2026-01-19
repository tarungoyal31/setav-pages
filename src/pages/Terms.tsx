import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AppBar1Floating from "../components/appbar/AppBar1Floating";
import Footer1Floating from "../components/footer/Footer1Floating";

export default function Terms() {
    return (
        <Box>
            <AppBar1Floating />
            <Container sx={{pt: 15, pb: 8, minHeight: '60vh'}}>
                <div>
                    <h1>Setav Terms and Conditions</h1>

                    <p>By accessing or using the Setav app, you agree to be bound by these Terms and Conditions. If you
                        disagree with any part of these Terms and Conditions, please do not use
                        the app.</p>

                    <h2>User Account</h2>
                    <ul>
                        <li>You may be required to create a user account to access certain features of the app.</li>
                        <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                        <li>You agree to provide accurate and up-to-date information.</li>
                    </ul>

                    <h2>Use of the App</h2>
                    <ul>
                        <li>You agree to use the app in a lawful and ethical manner.</li>
                        <li>You agree not to misuse the app or engage in any activity that could harm the app or its
                            users.
                        </li>
                    </ul>

                    <h2>Intellectual Property</h2>
                    <ul>
                        <li>The Setav app and its content are protected by copyright and other intellectual property
                            laws.
                        </li>
                        <li>You may not use the app's content without express permission.</li>
                    </ul>

                    <h2>Data Privacy</h2>
                    <ul>
                        <li>We collect and process your personal information in accordance with our Privacy Policy.</li>
                        <li>You agree to the collection and use of your information as outlined in the Privacy Policy.
                        </li>
                    </ul>

                    <h2>Disclaimer of Warranties</h2>
                    <p>The app is provided "as is" without any warranties, express or implied. We do not guarantee the
                        accuracy, completeness, or reliability
                        of the app or its content.</p>

                    <h2>Limitation of Liability</h2>
                    <p>In no event shall we be liable for any indirect, incidental, special, or consequential damages
                        arising out of or in connection
                        with the use of the app.</p>

                    <h2>Modifications to Terms</h2>
                    <p>We reserve the right to modify these Terms and Conditions at any time. Your continued use of the
                        app
                        after any modifications constitutes your acceptance of the revised Terms and Conditions.</p>

                    <h2>Termination</h2>
                    <p>We may terminate your access to the app at any time, with or without notice.</p>

                    <h2>Governing Law</h2>
                    <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of
                        [Jurisdiction].</p>


                    <p>**Remember to consult with a legal professional to ensure compliance with specific laws and
                        regulations.**</p>
                </div>
            </Container>
            <Footer1Floating/>
        </Box>
    );
}
