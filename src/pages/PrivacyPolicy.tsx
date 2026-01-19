import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AppBar1Floating from "../components/appbar/AppBar1Floating";
import Footer1Floating from "../components/footer/Footer1Floating";

export default function PrivacyPolicy() {
    return (
        <Box>
            <AppBar1Floating />
            <Container sx={{ pt: 15, pb: 8, minHeight: '60vh' }}>
                <Typography variant="body1">
                    <h1>Setav Privacy Policy</h1>

                    <p>Setav Innovations Private Limited ("Setav") respects your privacy and is committed to protecting
                        your
                        personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard
                        your
                        information when you use our Setav app.</p>

                    <h2>Information We Collect</h2>
                    <p>We may collect the following personal information from you:</p>
                    <ul>
                        <li>Basic Information: Name, phone number, email address, and professional information such as
                            company name, designation, and industry.
                        </li>
                        <li>Social Media Links: Links to your social media profiles.</li>
                        <li>Products and Services: Information about the products or services you offer.</li>
                    </ul>

                    <h2>In app permissions</h2>
                    <ul>
                        <li><b>Camera</b>: We use the camera to scan QR codes. These QR codes contains contact links.
                        </li>
                        <li><b>Contacts permission</b>: We use contacts permission for contact search and showing
                            already added
                            cards.
                            <p>Note: Your contacts are private and are never shared with any third party in any
                                form.</p>
                        </li>
                    </ul>

                    <h2>How We Use Your Information</h2>
                    <p>We use your personal information for the following purposes:</p>
                    <ul>
                        <li>Creating and Managing Your Profile</li>
                        <li>Sharing Your Profile</li>
                        <li>Improving Our Services</li>
                        <li>Compliance with Legal Obligations</li>
                    </ul>

                    <h2>Data Security</h2>
                    <p>We implement robust security measures to protect your personal information from unauthorized
                        access,
                        disclosure, alteration, or destruction. These measures include:</p>
                    <ul>
                        <li>Data Encryption</li>
                        <li>Secure Data Storage</li>
                        <li>Access Controls</li>
                        <li>Regular Security Audits</li>
                    </ul>

                    <h2>Sharing Your Information</h2>
                    <p>We may share your personal information with third-party service providers who assist us in
                        operating
                        our app. These service providers are bound by strict confidentiality obligations and are
                        prohibited
                        from using your information for any purpose other than providing services to us.</p>

                    <h2>Your Choices</h2>
                    <p>You have the following choices regarding your personal information:</p>
                    <ul>
                        <li>Access and Correction</li>
                        <li>Deletion</li>
                        <li>Sharing Your Profile</li>
                    </ul>

                    <h2>Changes to This Privacy Policy</h2>
                    <p>We may update this Privacy Policy from time to time. We will notify you of any significant
                        changes by
                        posting a notice on our app or by sending you an email.</p>

                    <h2>Contact Us</h2>
                    <p>If you have any questions or concerns about this Privacy Policy or our data practices, please
                        contact
                        us at support@setav.ai</p>

                </Typography>
            </Container>
            <Footer1Floating/>
        </Box>
    );
}
