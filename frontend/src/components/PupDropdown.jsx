export default function PupDropdown( { pups, selectPup, handleChange }) {
    return (
        <>
            <label style={{ textAlign: 'center' }} htmlFor="pup">Select a Pup</label>
            <select id="pup" name="pup" value={selectPup} onChange={handleChange}>
                {pups.map(pup => (
                    <option key={pup.id} value={pup.id}>{pup.pup_name}</option>
                ))}
            </select>
        </>
    );
}