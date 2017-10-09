export function updateTimeMap(newMap, csrfToken) {
    return fetch("/api/v1/timemap/1/",
          {
              method: 'PUT',
              body: JSON.stringify(newMap),
              credentials: 'include',
              headers: {
                  'X-CSRFToken': csrfToken,
                  'Content-Type': 'application/json',
              },
          });
}
