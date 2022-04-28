import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


// Create styles
const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: '0 30',
        display: 'flex',
        justifyContent: 'center',
    },
    wrapper: {
        marginBottom: 80,
        width: '50%',
        marginTop: 60,
        display: 'flex',
        justifyContent: 'center',
    },
    order_summary: {
        width: '100%',
    }
  });


export default function ReactPdf() {
  return (
    <Document>
        <Page size="A4" style={styles.container}>
            <View style={styles.wrapper}>
                <Text>
                </Text>
            </View>
            <View style={styles.section}>
                <Text>
                </Text>
            </View>
        </Page>
    </Document>
  )
}
