const Student = (props) => {
    const fW = props.fromWisconsin;
    const sfw = fW ? "is from Wisconsin" : "is NOT from Wisconsin";
    const cred = props.numCredits;
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        <p><strong>{props.major}</strong></p>
        <p>{props.name.first} is taking {cred} credits and {sfw}</p>
        <p>They have {props.interests.length} interests including...</p>
        <ul>
            {...props.interests.map((i) => (
                <li key={i}>{i}</li>
            ))}
        </ul>
    </div>
}

export default Student;