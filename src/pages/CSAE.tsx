import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AppBar1Floating from "../components/appbar/AppBar1Floating";
import Footer1Floating from "../components/footer/Footer1Floating";

export default function CSAE() {
    return (
        <Box>
            <AppBar1Floating />
            <Container sx={{pt: 15, pb: 8, minHeight: '60vh'}}>
                <div>
                    <h1>Child Sexual Abuse and Exploitation Policy</h1>

                    <section>
                        <h2>1. Introduction</h2>
                        <p>Setav is committed to creating a safe and professional digital environment. We have a
                            zero-tolerance policy for child sexual abuse and exploitation (CSAE). This policy outlines
                            our
                            approach to detecting, reporting, and preventing such activities in compliance with global
                            laws
                            and best practices.</p>
                    </section>

                    <section>
                        <h2>2. Scope</h2>
                        <p>This policy applies to all users, content, and interactions on Setav, including:</p>
                        <ul>
                            <li>User profiles</li>
                            <li>Shared links and media</li>
                            <li>Messaging and communication features</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. Prohibited Content and Activities</h2>
                        <p>Setav strictly prohibits:</p>
                        <ul>
                            <li>Uploading, sharing, or distributing child sexual abuse material (CSAM)</li>
                            <li>Grooming or soliciting minors for sexual purposes</li>
                            <li>Using Setav to facilitate child trafficking or exploitation</li>
                            <li>Any activity that violates child protection laws</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Detection and Moderation</h2>
                        <p>To prevent CSAE, Setav employs:</p>
                        <ul>
                            <li>Automated content scanning for CSAM</li>
                            <li>Manual review of flagged content</li>
                            <li>Reporting mechanisms for users to report suspected CSAE</li>
                            <li>Regular training for moderators on identifying and handling CSAE cases</li>
                        </ul>
                    </section>

                    <section>
                        <h2>5. Reporting and Cooperation with Authorities</h2>
                        <p>Any detected CSAM or CSAE-related activities are reported to law enforcement and child
                            protection
                            organizations.</p>
                        <p>Setav cooperates fully with law enforcement agencies and international child protection
                            bodies.</p>
                        <p>Users can report suspected CSAE through our in-app reporting system or via email at <a
                            href="mailto:support@setav.com">support@setav.com</a>.</p>
                    </section>

                    <section>
                        <h2>6. Account Actions and Consequences</h2>
                        <p>Setav enforces the following actions:</p>
                        <ul>
                            <li>Immediate removal of any CSAM or CSAE-related content</li>
                            <li>Permanent banning of users involved in CSAE activities</li>
                            <li>Legal action where applicable, including reporting to authorities</li>
                        </ul>
                    </section>

                    <section>
                        <h2>7. Prevention and Awareness</h2>
                        <p>Setav is dedicated to:</p>
                        <ul>
                            <li>Raising awareness about online child safety</li>
                            <li>Collaborating with child protection organizations</li>
                            <li>Implementing age-verification measures where necessary</li>
                        </ul>
                    </section>

                    <section>
                        <h2>8. Compliance and Legal Framework</h2>
                        <p>Setav adheres to international child protection laws, including:</p>
                        <ul>
                            <li>The United Nations Convention on the Rights of the Child (UNCRC)</li>
                            <li>U.S. PROTECT Act and National Center for Missing & Exploited Children (NCMEC) reporting
                                requirements
                            </li>
                            <li>General Data Protection Regulation (GDPR) for data handling</li>
                        </ul>
                    </section>

                    <section>
                        <h2>9. Policy Updates</h2>
                        <p>This policy will be reviewed and updated regularly to strengthen protections against
                            CSAE.</p>
                    </section>

                    <section>
                        <h2>10. Contact Information</h2>
                        <p>For concerns or reports, contact: <a href="mailto:support@setav.com">support@setav.com</a>
                        </p>
                    </section>
                </div>
            </Container>
            <Footer1Floating/>
        </Box>
    );
}
