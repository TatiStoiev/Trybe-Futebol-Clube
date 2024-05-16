export default function mapStatusHTTP(status: string): number {
  switch (status) {
    case 'SUCCESSFUL': return 200;
    case 'INVALID_DATA': return 401;
    case 'NOT_FOUND': return 404;
    case 'BAD_REQUEST': return 400;
    default: return 500;
  }
}
