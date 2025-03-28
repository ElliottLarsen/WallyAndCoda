export default function ContentCard( { className, content }) {
    return (
        <>
        <div className={className}>
            {content}
        </div>
        </>
    );
}