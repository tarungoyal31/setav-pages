import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AppBar1Floating from "../components/appbar/AppBar1Floating";
import Footer1Floating from "../components/footer/Footer1Floating";

const scenarios = [
    {
        scenario: "Cancelled by User",
        userRefund: "Booking amount minus platform charges (e.g. \u20B9950)",
        providerPayout: "No payout",
        platformCharges: "Deducted from user's refund",
    },
    {
        scenario: "Cancelled by Service Provider",
        userRefund: "Full booking amount (e.g. \u20B91,000)",
        providerPayout: "No payout; bears the platform charges (e.g. \u20B950)",
        platformCharges: "Borne by the service provider",
    },
    {
        scenario: "User No-Show",
        userRefund: "No refund",
        providerPayout: "Full payout after platform charges",
        platformCharges: "Deducted from service provider's payout as usual",
    },
    {
        scenario: "Service Provider No-Show",
        userRefund: "Full booking amount (e.g. \u20B91,000)",
        providerPayout: "No payout; bears the platform charges (e.g. \u20B950)",
        platformCharges: "Borne by the service provider",
    },
];

export default function CancellationPolicy() {
    return (
        <Box>
            <AppBar1Floating />
            <Container sx={{ pt: 15, pb: 8, minHeight: '60vh' }}>
                <div>
                    <h1>Cancellation &amp; Refund Policy</h1>

                    <p>
                        This policy outlines what happens when an appointment is cancelled or when either party
                        does not show up. All examples below assume a booking amount of <strong>{"\u20B9"}1,000</strong> and
                        a platform charge of <strong>5%</strong> (i.e. <strong>{"\u20B9"}50</strong>).
                    </p>

                    <h2>1. Appointment Cancelled by User</h2>
                    <p>
                        If a user cancels a confirmed appointment, the booking amount is refunded to the user
                        after deducting the platform charges.
                    </p>
                    <ul>
                        <li>Booking amount: {"\u20B9"}1,000</li>
                        <li>Platform charges (5%): {"\u20B9"}50</li>
                        <li><strong>Refund to user: {"\u20B9"}950</strong></li>
                    </ul>
                    <p>The service provider receives no payout for a user-cancelled appointment.</p>

                    <h2>2. Appointment Cancelled by Service Provider</h2>
                    <p>
                        If the service provider cancels a confirmed appointment, the user receives a
                        full refund of the original booking amount. The service provider bears the platform charges
                        as a cancellation penalty.
                    </p>
                    <ul>
                        <li>Booking amount: {"\u20B9"}1,000</li>
                        <li><strong>Refund to user: {"\u20B9"}1,000</strong> (full amount)</li>
                        <li>Platform charges ({"\u20B9"}50) borne by the service provider</li>
                    </ul>

                    <h2>3. User No-Show</h2>
                    <p>
                        If the user fails to show up for a confirmed appointment without prior cancellation,
                        no refund will be issued. The service provider will receive their full payout
                        (after standard platform charges).
                    </p>
                    <ul>
                        <li>Refund to user: <strong>None</strong></li>
                        <li>Service provider payout: {"\u20B9"}950 (booking amount minus platform charges)</li>
                    </ul>

                    <h2>4. Service Provider No-Show</h2>
                    <p>
                        If the service provider fails to show up for a confirmed appointment, the user
                        receives a full refund of the original booking amount. The service provider receives no
                        payout and bears the platform charges as a penalty.
                    </p>
                    <ul>
                        <li><strong>Refund to user: {"\u20B9"}1,000</strong> (full amount)</li>
                        <li>Service provider payout: None</li>
                        <li>Platform charges ({"\u20B9"}50) borne by the service provider</li>
                    </ul>

                    <h2>Summary</h2>
                </div>

                <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography sx={{ fontWeight: 600 }}>Scenario</Typography></TableCell>
                                <TableCell><Typography sx={{ fontWeight: 600 }}>User Refund</Typography></TableCell>
                                <TableCell><Typography sx={{ fontWeight: 600 }}>Service Provider Payout</Typography></TableCell>
                                <TableCell><Typography sx={{ fontWeight: 600 }}>Platform Charges</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {scenarios.map((row) => (
                                <TableRow key={row.scenario}>
                                    <TableCell>{row.scenario}</TableCell>
                                    <TableCell>{row.userRefund}</TableCell>
                                    <TableCell>{row.providerPayout}</TableCell>
                                    <TableCell>{row.platformCharges}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                        Refunds are typically processed within 5–7 business days, depending on your payment
                        provider. If you have any questions, reach out to us
                        at <a href="mailto:support@setav.ai">support@setav.ai</a>.
                    </Typography>
                </Box>
            </Container>
            <Footer1Floating />
        </Box>
    );
}
