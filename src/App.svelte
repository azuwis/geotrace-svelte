<script>
 import IP2Region from 'ip2region';
 const Query = new IP2Region();

 let input = '';

 function ipFilter(input) {
   const ip_regexp = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
   const ip_regexp_rfc1918 = /^(?:10|127|172\.(?:1[6-9]|2[0-9]|3[01])|192\.168)\..*/;
   return input.trim().split("\n")
               .map(elem => {
                 if (elem.includes('traceroute')) return null;
                 const m = elem.match(ip_regexp);
                 return m ? m[0] : null
               })
               .filter(elem => elem && !elem.match(ip_regexp_rfc1918))
               .map(elem => ({...Query.binarySearch(elem, true), ...{ip: elem}}));
 };

 $: infos = ipFilter(input);

</script>

<style>
 textarea {
   width: 100%;
   height: 300px;
   margin-bottom: 0px;
 }

 th, td {
   padding: 2px 5px;
 }
</style>

<div>
  <div class="row">
    <div class="six columns">
      <textarea bind:value={input}></textarea>
      <button on:click={() => {input = '';}}>Reset</button>
    </div>
    <div class="six columns">
      <table>
        <thead>
          <tr>
            <th>Num</th>
            <th>IP</th>
            <th>Country</th>
            <th>Province</th>
            <th>City</th>
            <th>ISP</th>
          </tr>
        </thead>
        <tbody>
          {#each infos as {ip, country, province, city, isp}, index }
          <tr>
            <td>{index+1}</td>
            <td>{ip}</td>
            <td>{country}</td>
            <td>{province === '0' ? '' : province.replace(/省$/, '')}</td>
            <td>{city === '0' ? '' : city.replace(/市$/, '')}</td>
            <td>{isp === '0' ? '' : isp}</td>
          </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
