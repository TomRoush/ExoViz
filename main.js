/*   

   Javascript reading file from .csv format and simple visualization routine 
   
*/

package com.journaldev.csv;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;


public class Planet {

	private int id;
	private String name;
	private double ra;
	private double dec;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public double getRA() {
		return ra;
	}
	public void setRA(double ra) {
		this.ra = ra;
	}
	public double getDec() {
		return dec;
	}
	public void setDec(double dec) {
		this.dec = dec;
	}
	
	@Override
	public String toString(){
		return "\nID="+getId()+"::Name"+getName()+"::RA="+getRA()+"::Dec="+getDec();
	}
}

public class ReadCSVWithScanner {

	public static void main(String[] args) throws IOException {
		BufferedReader reader = new BufferedReader(new FileReader(
				"cumulative.csv"));

		String line = null;
		Scanner scanner = null;
		int index = 0;
		List<Planet> planetList = new ArrayList<>();

		while ((line = reader.readLine()) != null) {
			Planet p = new Planet();
			scanner = new Scanner(line);
			scanner.useDelimiter(",");
			while (scanner.hasNext()) {
				String data = scanner.next();
				if (index == 0)
					p.setId(Integer.parseInt(data));
				else if (index == 1)
					p.setName(data);
				else if (index == 105) //???
					p.setRA(Double.parseDouble(data));
				else if (index == 106)
					p.setDec(Double.parseDouble(data));
				else
					System.out.println("invalid data::" + data);
				index++;
			}
			index = 0;
			planetList.add(p);
		}
		
		reader.close();		
		System.out.println(planetList);
		
	}

}