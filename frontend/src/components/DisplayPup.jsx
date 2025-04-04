export default function DisplayPup({ currentPup }) {
    return (
        <>
            <h2>{currentPup.pup_name}</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Sex:</th>
                        <td>{currentPup.pup_sex}</td>
                    </tr>
                    <tr>
                        <th>Microchip Number:</th>
                        <td>{currentPup.microchip_number}</td>
                    </tr>
                    <tr>
                        <th>AKC Registration Number:</th>
                        <td>{currentPup.akc_registration_number}</td>
                    </tr>
                    <tr>
                        <th>AKC Registration Name:</th>
                        <td>{currentPup.akc_registration_name}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}