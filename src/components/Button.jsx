// Simple Button component that replicates <button>
export default function Button(props) {
  return <button {...props}>{props.children}</button>;
}
