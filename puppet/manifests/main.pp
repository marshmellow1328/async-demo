class {'nodejs':
	version	=> 'v0.10.28'
}

package {'grunt-cli':
	ensure		=> '0.1.13',
	provider	=> 'npm',
	require		=> Class['nodejs']
}

exec {'npm-install':
	command	=> '/usr/local/node/node-default/bin/npm install',
	cwd		=> '/vagrant/sse',
	require	=> Class['nodejs']
}
