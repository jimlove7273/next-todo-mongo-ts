const baseUrl = "/api/todos";
import useSWR from 'swr'

const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())

const buildConfig = (config) => {
	return {
			...config,
			headers: {
					'Content-Type': 'application/json',
			}
	}
};

const makeRequest = (uri, config) => {
	return fetch(uri, buildConfig(config))
		.then(res => res.json())
		.then(data => { return data })
}

export const doGet = () => {
	return makeRequest(baseUrl, {
			method: "GET"
	})
}