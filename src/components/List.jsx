// Simple List component that replicates <li>
export default function List(props) {
  return <li {...props} className={props.className ? props.className + ' no-dot' : 'no-dot'}>{props.children}</li>;
}
